/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import imageIcons from '../../images/icons.svg';
import imageButtons from '../../images/buttons.svg';
import imageTables from '../../images/tables.svg';
import imageForms from '../../images/forms.svg';
import imageFlexgrid from '../../images/flexgrid.svg';
import imageCards from '../../images/cards.svg';
import imagePages from '../../images/page.svg';
import imageText from '../../images/text.svg';
import {
  OuiCard,
  OuiFlexGroup,
  OuiFlexItem,
  OuiLink,
  OuiSpacer,
  OuiText,
  OuiTitle,
  OuiPanel,
  OuiIcon,
  OuiPageContent,
  OuiPageContentBody,
} from '../../../../src/components';

export const HomeView = () => (
  <OuiPageContent
    hasShadow={false}
    hasBorder={false}
    paddingSize="none"
    color="transparent"
    borderRadius="none">
    <OuiPageContentBody restrictWidth>
      <OuiPanel color="subdued" hasShadow={false} paddingSize="none">
        <OuiFlexGroup
          alignItems="center"
          gutterSize="none"
          className="guideHome__hero">
          <OuiFlexItem>
            <OuiTitle size="l">
              <h1>OpenSearch UI</h1>
            </OuiTitle>
            <OuiSpacer />
            <OuiSpacer />
            <OuiTitle size="s">
              <h2>The framework powering OpenSearch</h2>
            </OuiTitle>
            <OuiSpacer size="s" />
            <OuiText grow={false}>
              <p>
                The OpenSearch UI framework (OUI) is the design library we use
                at the OpenSearch Project to build projects that share our
                aesthetics. It distributes UI React components and static assets
                for use in building web layouts.
              </p>
              <OuiFlexGroup gutterSize="xl" wrap responsive={false}>
                <OuiFlexItem grow={false}>
                  <OuiLink href="https://github.com/opensearch-project/oui/blob/main/wiki/consuming.md">
                    <strong>Getting started</strong>
                  </OuiLink>
                </OuiFlexItem>
                <OuiFlexItem grow={false}>
                  <Link to="/package/changelog">
                    <strong>What&apos;s new</strong>
                  </Link>
                </OuiFlexItem>
                <OuiFlexItem grow={false}>
                  <OuiLink href="https://github.com/opensearch-project/oui/blob/main/CONTRIBUTING.md">
                    <strong>Contributing</strong>
                  </OuiLink>
                </OuiFlexItem>
              </OuiFlexGroup>
            </OuiText>
          </OuiFlexItem>
        </OuiFlexGroup>
      </OuiPanel>
      <OuiSpacer size="xl" />
      <div className="guideHomePage__benefitsContainer">
        <OuiCard
          icon={<OuiIcon size="l" type="accessibility" />}
          layout="horizontal"
          display="plain"
          titleSize="xs"
          title="Accessible to everyone"
          description="Uses high contrast, color-blind safe palettes and tested with most
        assistive technology."
        />
        <OuiCard
          icon={<OuiIcon size="l" type="controlsHorizontal" />}
          layout="horizontal"
          display="plain"
          titleSize="xs"
          title="Flexible and composable"
          description="Configurable enough to meet the needs of a wide array of contexts while maintaining brand and low-level consistency."
        />
        <OuiCard
          icon={<OuiIcon size="l" type="documentEdit" />}
          layout="horizontal"
          display="plain"
          titleSize="xs"
          title="Well documented and tested"
          description="Code is friendly to the novice and expert alike."
        />
      </div>
      <OuiSpacer size="xl" />
      <div className="guideHomePage__featuredComponents">
        <OuiCard
          hasBorder
          href="#/navigation/button"
          textAlign="left"
          image={imageButtons}
          title="Buttons"
          description="Buttons for every usage you might need"
        />
        <OuiCard
          hasBorder
          href="#/display/card"
          textAlign="left"
          image={imageCards}
          title="Cards"
          description="Cards like these help you make repeatable content more presentable"
        />
        <OuiCard
          hasBorder
          href="#/layout/flex"
          textAlign="left"
          image={imageFlexgrid}
          title="Flexible layouts"
          description="Create layouts by using flex groups, grids, and items"
        />
        <OuiCard
          hasBorder
          href="#/forms/form-layouts"
          textAlign="left"
          image={imageForms}
          title="Forms"
          description="Input tags, layouts, and validation for your forms"
        />
        <OuiCard
          hasBorder
          href="#/display/icons"
          textAlign="left"
          image={imageIcons}
          title="Icons"
          description="Our SVG icon library gives you full control over size and color"
        />
        <OuiCard
          hasBorder
          href="#/layout/page"
          textAlign="left"
          image={imagePages}
          title="Pages"
          description="Layout your whole application page with this component and its series of child components"
        />
        <OuiCard
          hasBorder
          href="#/tabular-content/tables"
          textAlign="left"
          image={imageTables}
          title="Tables"
          description="Build tables from individual components or high level wrappers"
        />
        <OuiCard
          hasBorder
          href="#/display/text"
          textAlign="left"
          image={imageText}
          title="Text"
          description="Simple HTML text like paragraphs and lists are wrapped in a single text component for styling"
        />
      </div>

      <OuiSpacer size="xl" />
      <div>
        <OuiText size="xs" textAlign="center" color="subdued">
          <p>
            OUI is licensed under{' '}
            <OuiLink href="https://github.com/opensearch-project/oui/blob/main/LICENSE">
              Apache License 2.0
            </OuiLink>{' '}
            | © OpenSearch contributors, {new Date().getFullYear()}.
          </p>
        </OuiText>
      </div>
    </OuiPageContentBody>
  </OuiPageContent>
);
