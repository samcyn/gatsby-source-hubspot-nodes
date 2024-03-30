import type { GatsbyNode } from 'gatsby';
import type { ObjectSchema } from 'gatsby-plugin-utils';

import { IPluginOptionsInternal } from './types';

/**
 * When you expose options for your plugin, it's best practice to validate the user input.
 * You can use the pluginOptionsSchema API to do this, which is powered by Joi: https://joi.dev/
 * If for example a user would forget to add the endpoint option, Gatsby will show a validation error.
 * @see https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#pluginOptionsSchema
 * @see https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/configuring-usage-with-plugin-options/
 */
export const pluginOptionsSchema: GatsbyNode['pluginOptionsSchema'] = ({ Joi }): ObjectSchema => {
  return Joi.object<unknown, IPluginOptionsInternal>({
    endpoint: Joi.string().uri().required().description('Hubspot API endpoint v2'),
    headers: Joi.object<unknown, IPluginOptionsInternal['headers']>(),
    searchParams: Joi.object<unknown, IPluginOptionsInternal['searchParams']>(),
  });
};
