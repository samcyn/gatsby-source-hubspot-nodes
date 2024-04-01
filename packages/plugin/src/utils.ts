import type { NodeInput, SourceNodesArgs } from 'gatsby';
import fetch, { HeadersInit } from 'node-fetch';

import { IPluginOptionsInternal, IPostImageInput, IPostInput } from './types';
import { NODE_TYPES } from './constants';
import { IRemoteImageNodeInput } from 'gatsby-plugin-utils/index';

const defaultHeaders = {
  'Content-Type': 'application/json',
} satisfies HeadersInit;

interface IApiResponse<T> {
  correlationId: string;
  errorType: string;
  message: string;
  status: string;
  [x: string]: Array<T> | unknown;
}

export async function fetchRequest<T = IPostInput>(
  pluginOptions: Pick<IPluginOptionsInternal<T>, 'endpoint' | 'requestOptions' | 'searchParams'>
): Promise<IApiResponse<T>> {
  const { endpoint, requestOptions, searchParams } = pluginOptions;

  const params = searchParams || {};
  const url = `${endpoint}?${new URLSearchParams(params).toString()}`;

  const { headers, method, ...rest } = requestOptions;

  const response = await fetch(url, {
    method: method || 'GET',
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...rest,
  });

  const result = await response.json();
  return result;
}

export const apiResponseFormatter: IPluginOptionsInternal<IPostInput>['nodeTypeOptions']['apiResponseFormatter'] = (
  response
) => {
  return response.objects;
};

export const nodeBuilderFormatter: IPluginOptionsInternal<IPostInput>['nodeTypeOptions']['nodeBuilderFormatter'] = ({
  gatsbyApi,
  input,
}) => {
  const id = gatsbyApi.createNodeId(`${input.type}-${input.data.id}`);

  const extraData: Record<string, unknown> = {};

  if (input.type === 'Post') {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { featured_image, featured_image_alt_text, featured_image_height, featured_image_width } =
      input.data as IPostInput;

    const featuredImage = {
      url: featured_image,
      alt: featured_image_alt_text,
      width: featured_image_width,
      height: featured_image_height,
    } satisfies IPostImageInput;

    const assetId = createAssetNode(gatsbyApi, featuredImage);

    // This sets the autogenerated Node ID onto the "image" key of the Post node. Then the @link directive in the schema will work.
    extraData.featured_image = assetId;
  }

  const node = {
    ...input.data,
    ...extraData,
    id,
    parent: null,
    children: [],
    internal: {
      type: input.type,
      /**
       * The content digest is a hash of the entire node.
       * Gatsby uses this internally to determine if the node needs to be updated.
       */
      contentDigest: gatsbyApi.createContentDigest(input.data),
    },
  } satisfies NodeInput;

  /**
   * Add the node to Gatsby's data layer. This is the most important piece of a Gatsby source plugin.
   * @see https://www.gatsbyjs.com/docs/reference/config-files/actions/#createNode
   */
  gatsbyApi.actions.createNode(node);
};

export function createAssetNode(gatsbyApi: SourceNodesArgs, data: IPostImageInput) {
  const id = gatsbyApi.createNodeId(`${NODE_TYPES.Asset}-${data.url}`);

  /**
   * For Image CDN and the "RemoteFile" interface, these fields are required:
   * - url
   * - filename
   * - mimeType
   * For images, these fields are also required:
   * - width
   * - height
   */
  const assetNode = {
    id,
    url: data.url,
    mimeType: `image/jpg`,
    filename: data.url,
    width: data.width,
    height: data.height,
    placeholderUrl: `${data.url}&w=%width%&h=%height%`,
    alt: data.alt,
    parent: null,
    children: [],
    internal: {
      type: NODE_TYPES.Asset,
      contentDigest: gatsbyApi.createContentDigest(data),
    },
  } satisfies IRemoteImageNodeInput;

  gatsbyApi.actions.createNode(assetNode);

  /**
   * Return the id so it can be used for the foreign key relationship on the Post node.
   */
  return id;
}
