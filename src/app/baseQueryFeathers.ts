import { feathers } from '@feathersjs/feathers';
import { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

import localstorage from 'feathers-localstorage';
import _ from 'lodash';

const client = feathers();
client.use('/users', localstorage({ name: 'users', startId: 1 })).hooks({
  after: {
    all: (context) => {
      context.result = _.isArray(context.result)
        ? _.map(context.result, (res) => _.omit(res, 'password'))
        : _.omit(context.result, 'password');
      return context;
    },
  },
});
// Password is not encrypted intentionally ... as it is building demo purpose
client.use('/authenticate', {
  async create(data: any) {
    const user = _.first(
      await (client.service('users') as any)._find({
        query: {
          email: data.email,
        },
      }),
    ) as any;
    if (!user) {
      throw new Error('User Not Found');
    }
    if (!_.isEqual(user.password, data.password)) {
      throw new Error('Password doesnt match');
    }
    return {
      user,
      token: 'wasfsafasfewtewtewtewt',
    };
  },
});

export const feathersBaseQuery: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (
  args: FetchArgs,
) => {
  try {
    const { body, method, params = {}, url } = args as FetchArgs & { method: string };
    const urlBlocks = _.compact(url.split('/'));

    if (/post/i.test(method)) {
      return { data: await client.service(urlBlocks[0]).create(body) };
    } else if (/patch/i.test(method)) {
      return { data: await client.service(urlBlocks[0]).patch(urlBlocks[1], body) };
    } else if (/put/.test(method)) {
      return { data: await client.service(urlBlocks[0]).update(urlBlocks[1], body) };
    } else if (/delete/.test(method)) {
      return { data: await client.service(urlBlocks[0]).remove(urlBlocks[1]) };
    } else {
      console.log('lo', await client.service(urlBlocks[0]).find(params));
      return { data: await client.service(urlBlocks[0]).find(params) };
    }
  } catch (error) {
    return { error: { status: 400, data: error } };
  }
};
