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

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { OuiCodeEditor } from './code_editor';
import { keys } from '../../services';
import {
  findTestSubject,
  requiredProps,
  takeMountedSnapshot,
} from '../../test';

describe('OuiCodeEditor', () => {
  test('is rendered', () => {
    const component = mount(<OuiCodeEditor {...requiredProps} />);
    expect(takeMountedSnapshot(component)).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isReadOnly', () => {
      test('renders alternate hint text', () => {
        const component = mount(<OuiCodeEditor isReadOnly />);
        expect(takeMountedSnapshot(component)).toMatchSnapshot();
      });
    });

    describe('theme', () => {
      test('renders terminal theme', () => {
        const component = mount(<OuiCodeEditor theme="terminal" />);
        expect(takeMountedSnapshot(component)).toMatchSnapshot();
      });
    });

    describe('aria attributes', () => {
      test('allows setting aria-labelledby on textbox', () => {
        const component = mount(
          <OuiCodeEditor aria-labelledby="labelledbyid" />
        );
        expect(takeMountedSnapshot(component)).toMatchSnapshot();
      });

      test('allows setting aria-describedby on textbox', () => {
        const component = mount(
          <OuiCodeEditor aria-describedby="describedbyid" />
        );
        expect(takeMountedSnapshot(component)).toMatchSnapshot();
      });
    });
  });

  describe('behavior', () => {
    let container: HTMLDivElement | null;
    let component: ReactWrapper;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      component = mount(<OuiCodeEditor />, { attachTo: container });
    });

    afterEach(() => {
      container?.parentNode?.removeChild(container);
      container = null;
    });

    describe('hint element', () => {
      test('should be tabable', () => {
        const hint = findTestSubject(component, 'codeEditorHint').getDOMNode();
        expect(hint).toMatchSnapshot();
      });

      test('should be disabled when the ui ace box gains focus', () => {
        const hint = findTestSubject(component, 'codeEditorHint');
        hint.simulate('keyup', { key: keys.ENTER });
        expect(
          findTestSubject(component, 'codeEditorHint').getDOMNode()
        ).toMatchSnapshot();
      });

      test('should be enabled when the ui ace box loses focus', () => {
        const hint = findTestSubject(component, 'codeEditorHint');
        hint.simulate('keyup', { key: keys.ENTER });
        // @ts-ignore onBlurAce is known to exist and its params are only passed through to the onBlur callback
        component.instance().onBlurAce();
        expect(
          findTestSubject(component, 'codeEditorHint').getDOMNode()
        ).toMatchSnapshot();
      });
    });

    describe('interaction', () => {
      test('bluring the ace textbox should call a passed onBlur prop', () => {
        const blurSpy = jest.fn().mockName('blurSpy');
        const el = mount(<OuiCodeEditor onBlur={blurSpy} />);
        // @ts-ignore onBlurAce is known to exist and its params are only passed through to the onBlur callback
        el.instance().onBlurAce();
        expect(blurSpy).toHaveBeenCalled();
      });

      test('pressing escape in ace textbox will enable overlay', () => {
        // We cannot simulate the `commands` path, but this interaction still
        // serves as a fallback in cases where `commands` is unavailable.
        // @ts-ignore onFocusAce is known to exist
        component.instance().onFocusAce();
        // @ts-ignore onKeydownAce is known to exist and its params' values are unimportant
        component.instance().onKeydownAce({
          preventDefault: () => {},
          stopPropagation: () => {},
          key: keys.ESCAPE,
        });
        const hint = findTestSubject(component, 'codeEditorHint').getDOMNode();
        expect(hint).toBe(document.activeElement);
      });
    });
  });
});
