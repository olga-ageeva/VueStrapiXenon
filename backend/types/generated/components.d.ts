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

export interface HomeCaseCard extends Struct.ComponentSchema {
  collectionName: 'components_home_case_cards';
  info: {
    displayName: 'case_card';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link_text: Schema.Attribute.String;
    link_url: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomeHeroCard extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_cards';
  info: {
    displayName: 'hero_card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface HomeHeroHeading extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_headings';
  info: {
    displayName: 'hero_heading';
  };
  attributes: {
    button_text: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomeSolutionCard extends Struct.ComponentSchema {
  collectionName: 'components_home_solution_cards';
  info: {
    displayName: 'solution_card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link_text: Schema.Attribute.String;
    link_url: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'header.menu-block': HeaderMenuBlock;
      'header.menu-link': HeaderMenuLink;
      'home.case-card': HomeCaseCard;
      'home.hero-card': HomeHeroCard;
      'home.hero-heading': HomeHeroHeading;
      'home.solution-card': HomeSolutionCard;
    }
  }
}
