import type { Schema, Struct } from '@strapi/strapi';

export interface HeaderMenuBlock extends Struct.ComponentSchema {
  collectionName: 'components_header_menu_blocks';
  info: {
    displayName: 'menu_block';
  };
  attributes: {
    menu_link: Schema.Attribute.Component<'header.menu-link', true>;
  };
}

export interface HeaderMenuLink extends Struct.ComponentSchema {
  collectionName: 'components_header_menu_links';
  info: {
    displayName: 'menu_link';
  };
  attributes: {
    link_name: Schema.Attribute.String;
    link_url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'header.menu-block': HeaderMenuBlock;
      'header.menu-link': HeaderMenuLink;
    }
  }
}
