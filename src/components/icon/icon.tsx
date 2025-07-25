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

import React, {
  PureComponent,
  HTMLAttributes,
  ComponentType,
  SVGAttributes,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';

// @ts-ignore not generating typescript files or definitions for the generated JS components
// because we'd need to dynamically know if we're importing the
// TS file (dev/docs) or the JS file (distributed), and it's more effort than worth
// to generate & git track a TS module definition for each icon component
import { icon as defaultIcon } from './assets/beaker.js';
import { enqueueStateChange } from '../../services/react';

import { htmlIdGenerator } from '../../services';

const typeToPathMap = {
  accessibility: 'accessibility',
  addDataApp: 'app_add_data',
  advancedSettingsApp: 'app_advanced_settings',
  aggregate: 'aggregate',
  alert: 'alert',
  analyzeEvent: 'analyze_event',
  annotation: 'annotation',
  anomalyDetection: 'anomaly_detection',
  apmApp: 'app_apm',
  apmTrace: 'apm_trace',
  apps: 'apps',
  appSearchApp: 'app_app_search',
  arrowDown: 'arrow_down',
  arrowLeft: 'arrow_left',
  arrowRight: 'arrow_right',
  arrowUp: 'arrow_up',
  asterisk: 'asterisk',
  auditbeatApp: 'app_auditbeat',
  beaker: 'beaker',
  bell: 'bell',
  bellSlash: 'bellSlash',
  bolt: 'bolt',
  bookOpen: 'bookOpen',
  boxesHorizontal: 'boxes_horizontal',
  boxesVertical: 'boxes_vertical',
  branch: 'branch',
  broom: 'broom',
  brush: 'brush',
  bug: 'bug',
  bullseye: 'bullseye',
  calendar: 'calendar',
  canvasApp: 'app_canvas',
  codeApp: 'app_code',
  chatLeft: 'chatLeft',
  chatRight: 'chatRight',
  check: 'check',
  checkInCircleEmpty: 'checkInCircleEmpty',
  checkInCircleFilled: 'checkInCircleFilled',
  cheer: 'cheer',
  classificationJob: 'ml_classification_job',
  clock: 'clock',
  cloudDrizzle: 'cloudDrizzle',
  cloudStormy: 'cloudStormy',
  cloudSunny: 'cloudSunny',
  color: 'color',
  compass: 'compass',
  compute: 'compute',
  console: 'console',
  consoleApp: 'app_console',
  continuityAbove: 'continuityAbove',
  continuityAboveBelow: 'continuityAboveBelow',
  continuityBelow: 'continuityBelow',
  continuityWithin: 'continuityWithin',
  controlsHorizontal: 'controls_horizontal',
  controlsVertical: 'controls_vertical',
  copy: 'copy',
  copyClipboard: 'copy_clipboard',
  createAdvancedJob: 'ml_create_advanced_job',
  createMultiMetricJob: 'ml_create_multi_metric_job',
  createPopulationJob: 'ml_create_population_job',
  createSingleMetricJob: 'ml_create_single_metric_job',
  cross: 'cross',
  crossClusterReplicationApp: 'app_cross_cluster_replication',
  crosshairs: 'crosshairs',
  crossInACircleFilled: 'crossInCircleFilled',
  crossInCircleEmpty: 'crossInCircleEmpty',
  crossInCircleFilled: 'crossInCircleFilled',
  currency: 'currency',
  cut: 'cut',
  dashboard: 'dashboard',
  dashboardApp: 'app_dashboard',
  database: 'database',
  dataVisualizer: 'ml_data_visualizer',
  devToolsApp: 'app_devtools',
  discoverApp: 'app_discover',
  document: 'document',
  documentation: 'documentation',
  documentEdit: 'documentEdit',
  documents: 'documents',
  dot: 'dot',
  download: 'download',
  dockedBottom: 'dockedBottom',
  dockedDetached: 'dockedDetached',
  dockedLeft: 'dockedLeft',
  dockedRight: 'dockedRight',
  dockedTakeover: 'dockedTakeover',
  dockedTop: 'dockedTop',
  editorAlignCenter: 'editor_align_center',
  editorAlignLeft: 'editor_align_left',
  editorAlignRight: 'editor_align_right',
  editorBold: 'editor_bold',
  editorCodeBlock: 'editor_code_block',
  editorComment: 'editor_comment',
  editorDistributeHorizontal: 'editorDistributeHorizontal',
  editorDistributeVertical: 'editorDistributeVertical',
  editorHeading: 'editor_heading',
  editorItalic: 'editor_italic',
  editorItemAlignLeft: 'editorItemAlignLeft',
  editorItemAlignBottom: 'editorItemAlignBottom',
  editorItemAlignCenter: 'editorItemAlignCenter',
  editorItemAlignMiddle: 'editorItemAlignMiddle',
  editorItemAlignRight: 'editorItemAlignRight',
  editorItemAlignTop: 'editorItemAlignTop',
  editorLink: 'editor_link',
  editorOrderedList: 'editor_ordered_list',
  editorPositionBottomLeft: 'editorPositionBottomLeft',
  editorPositionBottomRight: 'editorPositionBottomRight',
  editorPositionTopLeft: 'editorPositionTopLeft',
  editorPositionTopRight: 'editorPositionTopRight',
  editorRedo: 'editor_redo',
  editorStrike: 'editor_strike',
  editorTable: 'editor_table',
  editorUnderline: 'editor_underline',
  editorUndo: 'editor_undo',
  editorUnorderedList: 'editor_unordered_list',
  email: 'email',
  empty: 'empty',
  emsApp: 'app_ems',
  eql: 'eql',
  eraser: 'eraser',
  exit: 'exit',
  expand: 'expand',
  expandMini: 'expandMini',
  exportAction: 'export',
  eye: 'eye',
  eyeClosed: 'eye_closed',
  faceHappy: 'face_happy',
  faceNeutral: 'faceNeutral',
  faceSad: 'face_sad',
  filebeatApp: 'app_filebeat',
  filter: 'filter',
  flag: 'flag',
  fold: 'fold',
  folderCheck: 'folder_check',
  folderClosed: 'folder_closed',
  folderExclamation: 'folder_exclamation',
  folderOpen: 'folder_open',
  frameNext: 'frameNext',
  framePrevious: 'framePrevious',
  fullScreen: 'full_screen',
  fullScreenExit: 'fullScreenExit',
  function: 'function',
  functionAdd: 'functionAdd',
  gear: 'gear',
  gisApp: 'app_gis',
  glasses: 'glasses',
  globe: 'globe',
  grab: 'grab',
  grabHorizontal: 'grab_horizontal',
  graphApp: 'app_graph',
  grid: 'grid',
  grokApp: 'app_grok',
  heart: 'heart',
  heartbeatApp: 'app_heartbeat',
  heatmap: 'heatmap',
  help: 'help',
  history: 'history',
  home: 'home',
  iInCircle: 'iInCircle',
  image: 'image',
  importAction: 'import',
  indexClose: 'index_close',
  indexEdit: 'index_edit',
  indexFlush: 'index_flush',
  indexManagementApp: 'app_index_management',
  indexMapping: 'index_mapping',
  indexOpen: 'index_open',
  indexPatternApp: 'app_index_pattern',
  indexRollupApp: 'app_index_rollup',
  indexRuntime: 'index_runtime',
  indexSettings: 'index_settings',
  inputOutput: 'inputOutput',
  inspect: 'inspect',
  integrationGeneral: 'integrationGeneral',
  integrationObservability: 'integrationObservability',
  integrationSearch: 'integrationSearch',
  integrationSecurity: 'integrationSecurity',
  invert: 'invert',
  ip: 'ip',
  keyboardShortcut: 'keyboard_shortcut',
  kqlField: 'kql_field',
  kqlFunction: 'kql_function',
  kqlOperand: 'kql_operand',
  kqlSelector: 'kql_selector',
  kqlValue: 'kql_value',
  layers: 'layers',
  lensApp: 'app_lens',
  lineChart: 'lineChart',
  link: 'link',
  list: 'list',
  listAdd: 'list_add',
  lock: 'lock',
  lockOpen: 'lockOpen',
  logsApp: 'app_logs',
  logoAerospike: 'logo_aerospike',
  logoApache: 'logo_apache',
  logoAppSearch: 'logo_app_search',
  logoAWS: 'logo_aws',
  logoAWSMono: 'logo_aws_mono',
  logoAzure: 'logo_azure',
  logoAzureMono: 'logo_azure_mono',
  logoBeats: 'logo_beats',
  logoBusinessAnalytics: 'logo_business_analytics',
  logoCeph: 'logo_ceph',
  logoCloud: 'logo_cloud',
  logoCloudEnterprise: 'logo_cloud_ece',
  logoCode: 'logo_code',
  logoCodesandbox: 'logo_codesandbox',
  logoCouchbase: 'logo_couchbase',
  logoDocker: 'logo_docker',
  logoDropwizard: 'logo_dropwizard',
  logoElastic: 'logo_elastic',
  logoElasticsearch: 'logo_elasticsearch',
  logoElasticStack: 'logo_elastic_stack',
  logoEnterpriseSearch: 'logo_enterprise_search',
  logoEtcd: 'logo_etcd',
  logoGCP: 'logo_gcp',
  logoGCPMono: 'logo_gcp_mono',
  logoGithub: 'logo_github',
  logoGmail: 'logo_gmail',
  logoGolang: 'logo_golang',
  logoGoogleG: 'logo_google_g',
  logoHAproxy: 'logo_haproxy',
  logoIBM: 'logo_ibm',
  logoIBMMono: 'logo_ibm_mono',
  logoKafka: 'logo_kafka',
  logoKibana: 'logo_kibana',
  logoKubernetes: 'logo_kubernetes',
  logoLogging: 'logo_logging',
  logoLogstash: 'logo_logstash',
  logoMaps: 'logo_maps',
  logoMemcached: 'logo_memcached',
  logoMetrics: 'logo_metrics',
  logoMongodb: 'logo_mongodb',
  logoMySQL: 'logo_mysql',
  logoNginx: 'logo_nginx',
  logoObservability: 'logo_observability',
  logoOpenSearch: 'logo_opensearch',
  logoOsquery: 'logo_osquery',
  logoPhp: 'logo_php',
  logoPostgres: 'logo_postgres',
  logoPrometheus: 'logo_prometheus',
  logoRabbitmq: 'logo_rabbitmq',
  logoRedis: 'logo_redis',
  logoSecurity: 'logo_security',
  logoSiteSearch: 'logo_site_search',
  logoSketch: 'logo_sketch',
  logoSlack: 'logo_slack',
  logoUptime: 'logo_uptime',
  logoWebhook: 'logo_webhook',
  logoWindows: 'logo_windows',
  logoWorkplaceSearch: 'logo_workplace_search',
  logstashFilter: 'logstash_filter',
  logstashIf: 'logstash_if',
  logstashInput: 'logstash_input',
  logstashOutput: 'logstash_output',
  logstashQueue: 'logstash_queue',
  machineLearningApp: 'app_ml',
  magnet: 'magnet',
  magnifyWithMinus: 'magnifyWithMinus',
  magnifyWithPlus: 'magnifyWithPlus',
  managementApp: 'app_management',
  mapMarker: 'map_marker',
  memory: 'memory',
  menu: 'menu',
  menuDown: 'menuDown',
  menuLeft: 'menuLeft',
  menuRight: 'menuRight',
  menuUp: 'menuUp',
  merge: 'merge',
  metricbeatApp: 'app_metricbeat',
  metricsApp: 'app_metrics',
  minimize: 'minimize',
  minus: 'minus',
  minusInCircle: 'minus_in_circle',
  minusInCircleFilled: 'minus_in_circle_filled',
  mobile: 'mobile',
  monitoringApp: 'app_monitoring',
  moon: 'moon',
  nested: 'nested',
  node: 'node',
  notebookApp: 'app_notebook',
  number: 'number',
  offline: 'offline',
  online: 'online',
  outlierDetectionJob: 'ml_outlier_detection_job',
  package: 'package',
  packetbeatApp: 'app_packetbeat',
  pageSelect: 'pageSelect',
  pagesSelect: 'pagesSelect',
  partial: 'partial',
  paperClip: 'paper_clip',
  pause: 'pause',
  pencil: 'pencil',
  percent: 'percent',
  pin: 'pin',
  pinFilled: 'pin_filled',
  pipelineApp: 'app_pipeline',
  play: 'play',
  playFilled: 'playFilled',
  plus: 'plus',
  plusInCircle: 'plus_in_circle',
  plusInCircleFilled: 'plus_in_circle_filled',
  polygon: 'polygon',
  popout: 'popout',
  power: 'power',
  pulse: 'pulse',
  push: 'push',
  questionInCircle: 'question_in_circle',
  quote: 'quote',
  radar: 'radar',
  radius: 'radius',
  recent: 'history',
  recentlyViewedApp: 'app_recently_viewed',
  redeploy: 'redeploy',
  refresh: 'refresh',
  regressionJob: 'ml_regression_job',
  reporter: 'reporter',
  reportingApp: 'app_reporting',
  returnKey: 'return_key',
  rocket: 'rocket',
  save: 'save',
  savedObjectsApp: 'app_saved_objects',
  scale: 'scale',
  search: 'search',
  searchProfilerApp: 'app_search_profiler',
  securityAnalyticsApp: 'app_security_analytics',
  securityApp: 'app_security',
  securitySignal: 'securitySignal',
  securitySignalDetected: 'securitySignalDetected',
  securitySignalResolved: 'securitySignalResolved',
  shard: 'shard',
  share: 'share',
  snowflake: 'snowflake',
  sortable: 'sortable',
  sortDown: 'sort_down',
  sortLeft: 'sortLeft',
  sortRight: 'sortRight',
  sortUp: 'sort_up',
  spacesApp: 'app_spaces',
  sparkleFilled: 'sparkle_filled',
  sqlApp: 'app_sql',
  starEmpty: 'star_empty',
  starEmptySpace: 'star_empty_space',
  starFilled: 'star_filled',
  starFilledSpace: 'star_filled_space',
  starMinusEmpty: 'star_minus_empty',
  starMinusFilled: 'star_minus_filled',
  starPlusEmpty: 'starPlusEmpty',
  starPlusFilled: 'starPlusFilled',
  stats: 'stats',
  stop: 'stop',
  stopFilled: 'stop_filled',
  stopSlash: 'stop_slash',
  storage: 'storage',
  string: 'string',
  submodule: 'submodule',
  swatchInput: 'swatch_input', // Undocumented on purpose. Has an extra stroke for OuiColorPicker
  symlink: 'symlink',
  tableOfContents: 'tableOfContents',
  tableDensityExpanded: 'table_density_expanded',
  tableDensityCompact: 'table_density_compact',
  tableDensityNormal: 'table_density_normal',
  tag: 'tag',
  tear: 'tear',
  temperature: 'temperature',
  thumbsDown: 'thumbsDown',
  thumbsUp: 'thumbsUp',
  timeline: 'timeline',
  timelionApp: 'app_timelion',
  timeslider: 'timeslider',
  training: 'training',
  trash: 'trash',
  upgradeAssistantApp: 'app_upgrade_assistant',
  uptimeApp: 'app_uptime',
  undeploy: 'undeploy',
  unfold: 'unfold',
  unlink: 'unlink',
  user: 'user',
  users: 'users',
  usersRolesApp: 'app_users_roles',
  vector: 'vector',
  videoPlayer: 'videoPlayer',
  visArea: 'vis_area',
  visAreaStacked: 'vis_area_stacked',
  visBarHorizontal: 'vis_bar_horizontal',
  visBarHorizontalStacked: 'vis_bar_horizontal_stacked',
  visBarVertical: 'vis_bar_vertical',
  visBarVerticalStacked: 'vis_bar_vertical_stacked',
  visBuilder: 'vis_builder',
  visBuilderSavedObject: 'vis_builder_saved_object',
  visGauge: 'vis_gauge',
  visGoal: 'vis_goal',
  visLine: 'vis_line',
  visMapCoordinate: 'vis_map_coordinate',
  visMapRegion: 'vis_map_region',
  visMetric: 'vis_metric',
  visPie: 'vis_pie',
  visQueryDQL: 'vis_query_dql',
  visQueryPPL: 'vis_query_ppl',
  visQueryPromQL: 'vis_query_promql',
  visQuerySQL: 'vis_query_sql',
  visTable: 'vis_table',
  visTagCloud: 'vis_tag_cloud',
  visText: 'vis_text',
  visTimelion: 'vis_timelion',
  visualizeApp: 'app_visualize',
  visVega: 'vis_vega',
  visVisualBuilder: 'vis_visual_builder',
  watchesApp: 'app_watches',
  wordWrap: 'wordWrap',
  wordWrapDisabled: 'wordWrapDisabled',
  workplaceSearchApp: 'app_workplace_search',
  wrench: 'wrench',
  // Token Icon Imports
  tokenClass: 'tokens/tokenClass',
  tokenProperty: 'tokens/tokenProperty',
  tokenEnum: 'tokens/tokenEnum',
  tokenVariable: 'tokens/tokenVariable',
  tokenMethod: 'tokens/tokenMethod',
  tokenAnnotation: 'tokens/tokenAnnotation',
  tokenException: 'tokens/tokenException',
  tokenInterface: 'tokens/tokenInterface',
  tokenParameter: 'tokens/tokenParameter',
  tokenField: 'tokens/tokenField',
  tokenElement: 'tokens/tokenElement',
  tokenFunction: 'tokens/tokenFunction',
  tokenBoolean: 'tokens/tokenBoolean',
  tokenString: 'tokens/tokenString',
  tokenArray: 'tokens/tokenArray',
  tokenNumber: 'tokens/tokenNumber',
  tokenConstant: 'tokens/tokenConstant',
  tokenObject: 'tokens/tokenObject',
  tokenEvent: 'tokens/tokenEvent',
  tokenKey: 'tokens/tokenKey',
  tokenNull: 'tokens/tokenNull',
  tokenStruct: 'tokens/tokenStruct',
  tokenPackage: 'tokens/tokenPackage',
  tokenOperator: 'tokens/tokenOperator',
  tokenEnumMember: 'tokens/tokenEnumMember',
  tokenRepo: 'tokens/tokenRepo',
  tokenSymbol: 'tokens/tokenSymbol',
  tokenFile: 'tokens/tokenFile',
  tokenModule: 'tokens/tokenModule',
  tokenNamespace: 'tokens/tokenNamespace',
  tokenDate: 'tokens/tokenDate',
  tokenIP: 'tokens/tokenIP',
  tokenNested: 'tokens/tokenNested',
  tokenAlias: 'tokens/tokenAlias',
  tokenShape: 'tokens/tokenShape',
  tokenGeo: 'tokens/tokenGeo',
  tokenRange: 'tokens/tokenRange',
  tokenBinary: 'tokens/tokenBinary',
  tokenJoin: 'tokens/tokenJoin',
  tokenPercolator: 'tokens/tokenPercolator',
  tokenFlattened: 'tokens/tokenFlattened',
  tokenRankFeature: 'tokens/tokenRankFeature',
  tokenRankFeatures: 'tokens/tokenRankFeatures',
  tokenKeyword: 'tokens/tokenKeyword',
  tokenCompletionSuggester: 'tokens/tokenCompletionSuggester',
  tokenDenseVector: 'tokens/tokenDenseVector',
  tokenText: 'tokens/tokenText',
  tokenTokenCount: 'tokens/tokenTokenCount',
  tokenSearchType: 'tokens/tokenSearchType',
  tokenHistogram: 'tokens/tokenHistogram',
  wsAnalytics: 'workspace/wsAnalytics',
  wsEssentials: 'workspace/wsEssentials',
  wsObservability: 'workspace/wsObservability',
  wsSearch: 'workspace/wsSearch',
  wsSecurityAnalytics: 'workspace/wsSecurityAnalytics',
  wsSelector: 'workspace/wsSelector',
  navAdministration: 'navigation/navAdministration',
  navAiFlow: 'navigation/navAiFlow',
  navAlerting: 'navigation/navAlerting',
  navAnomalyDetection: 'navigation/navAnomalyDetection',
  navDashboards: 'navigation/navDashboards',
  navData: 'navigation/navData',
  navDetectionRules: 'navigation/navDetectionRules',
  navDevtools: 'navigation/navDevtools',
  navDiscover: 'navigation/navDiscover',
  navExperiments: 'navigation/navExperiments',
  navGetStarted: 'navigation/navGetStarted',
  navInfo: 'navigation/navInfo',
  navInfra: 'navigation/navInfra',
  navIntegrations: 'navigation/navIntegrations',
  navJudgements: 'navigation/navJudgements',
  navManage: 'navigation/navManage',
  navMaps: 'navigation/navMaps',
  navModels: 'navigation/navModels',
  navNotebooks: 'navigation/navNotebooks',
  navNotifications: 'navigation/navNotifications',
  navOverview: 'navigation/navOverview',
  navQuerySets: 'navigation/navQuerySets',
  navReports: 'navigation/navReports',
  navSecurityCases: 'navigation/navSecurityCases',
  navSecurityFindings: 'navigation/navSecurityFindings',
  navServiceMap: 'navigation/navServiceMap',
  navServices: 'navigation/navServices',
  navSlos: 'navigation/navSlos',
  navThreatIntel: 'navigation/navThreatIntel',
  navTicketing: 'navigation/navTicketing',
  navUi: 'navigation/navUi',
  navSearchConfigurationsln: 'navigation/navSearchConfigurationsln',
};

export const TYPES = keysOf(typeToPathMap);

export type OuiIconType = keyof typeof typeToPathMap;

export type IconType = OuiIconType | string | ComponentType;

const colorToClassMap = {
  default: null,
  primary: 'ouiIcon--primary',
  secondary: 'ouiIcon--secondary',
  success: 'ouiIcon--success',
  accent: 'ouiIcon--accent',
  warning: 'ouiIcon--warning',
  danger: 'ouiIcon--danger',
  text: 'ouiIcon--text',
  subdued: 'ouiIcon--subdued',
  ghost: 'ouiIcon--ghost',
  inherit: 'ouiIcon--inherit',
};

export const COLORS: NamedColor[] = keysOf(colorToClassMap);

type NamedColor = keyof typeof colorToClassMap;

function isNamedColor(name: string): name is NamedColor {
  return colorToClassMap.hasOwnProperty(name);
}

// We accept arbitrary color strings, which are impossible to type.
export type IconColor = string | NamedColor;

const sizeToClassNameMap = {
  original: null,
  s: 'ouiIcon--small',
  m: 'ouiIcon--medium',
  l: 'ouiIcon--large',
  xl: 'ouiIcon--xLarge',
  xxl: 'ouiIcon--xxLarge',
};

export const SIZES: IconSize[] = keysOf(sizeToClassNameMap);

export type IconSize = keyof typeof sizeToClassNameMap;

export type OuiIconProps = CommonProps &
  Omit<SVGAttributes<SVGElement>, 'type' | 'color' | 'size'> & {
    /**
     * `Enum` is any of the named icons listed in the docs, `string` is usually a URL to an SVG file, and `elementType` is any React SVG component
     */
    type: IconType;
    /**
     * One of OUI's color palette or a valid CSS color value https://developer.mozilla.org/en-US/docs/Web/CSS/color_value.
     * Note that coloring only works if your SVG is removed of fill attributes.
     * **`secondary` color is DEPRECATED, use `success` instead**
     */
    color?: IconColor;
    /**
     * Note that every size other than `original` assumes the provided SVG sits on a square viewbox.
     */
    size?: IconSize;
    /**
     * Descriptive title for naming the icon based on its use
     */
    title?: string;
    /**
     * A unique identifier for the title element
     */
    titleId?: string;
    /**
     * Its value should be one or more element IDs
     */
    'aria-labelledby'?: string;
    /**
     * Callback when the icon has been loaded & rendered
     */
    onIconLoad?: () => void;
  };

interface State {
  icon: undefined | ComponentType | string;
  iconTitle: undefined | string;
  isLoading: boolean;
  neededLoading: boolean; // controls the fade-in animation, cached icons are immediately rendered
}

function isOuiIconType(type: OuiIconProps['type']): type is OuiIconType {
  return typeof type === 'string' && typeToPathMap.hasOwnProperty(type);
}

function isUrl(type: OuiIconProps['type']) {
  return typeof type === 'string' && (type.includes('.') || type.includes('/'));
}

function isCachedIcon(type: OuiIconProps['type']) {
  return isOuiIconType(type) && iconComponentCache.hasOwnProperty(type);
}

const generateId = htmlIdGenerator();

let iconComponentCache: { [iconType: string]: ComponentType } = {};

export const clearIconComponentCache = (iconType?: OuiIconType) => {
  if (iconType != null) {
    delete iconComponentCache[iconType];
  } else {
    iconComponentCache = {};
  }
};

export const appendIconComponentCache = (iconTypeToIconComponentMap: {
  [iconType: string]: ComponentType;
}) => {
  for (const iconType in iconTypeToIconComponentMap) {
    if (iconTypeToIconComponentMap.hasOwnProperty(iconType)) {
      iconComponentCache[iconType] = iconTypeToIconComponentMap[iconType];
    }
  }
};

export class OuiIcon extends PureComponent<OuiIconProps, State> {
  isMounted = true;
  constructor(props: OuiIconProps) {
    super(props);

    const { type } = props;
    let initialIcon;
    let isLoading = false;

    // Category 1: cached oui icons
    if (isCachedIcon(type)) {
      initialIcon = iconComponentCache[type as string];
      // Category 2: URL (relative, absolute)
    } else if (isUrl(type)) {
      initialIcon = type;
      // Category 3: non-cached oui icon or new icon
    } else if (typeof type === 'string') {
      isLoading = true;
      this.loadIconComponent(type as OuiIconType);
    } else {
      // Category 4: custom icon component
      initialIcon = type;
      this.onIconLoad();
    }

    this.state = {
      icon: initialIcon,
      iconTitle: undefined,
      isLoading,
      neededLoading: isLoading,
    };
  }

  componentDidUpdate(prevProps: OuiIconProps) {
    const { type } = this.props;
    if (type !== prevProps.type) {
      if (isOuiIconType(type)) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          neededLoading: iconComponentCache.hasOwnProperty(type),
          isLoading: true,
        });
        this.loadIconComponent(type);
      } else {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          icon: type,
          neededLoading: true,
          isLoading: false,
        });
      }
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  loadIconComponent = (iconType: OuiIconType) => {
    if (iconComponentCache.hasOwnProperty(iconType)) {
      // exists in cache
      this.setState({
        isLoading: false,
        neededLoading: false,
        icon: iconComponentCache[iconType],
      });
      this.onIconLoad();
      return;
    }

    const iconPath = typeToPathMap[iconType] || 'beaker';

    import(
      /* webpackChunkName: "icon.[request]" */
      // It's important that we don't use a template string here, it
      // stops webpack from building a dynamic require context.
      // eslint-disable-next-line prefer-template
      './assets/' + iconPath + '.js'
    ).then(({ icon }) => {
      iconComponentCache[iconType] = icon;
      enqueueStateChange(() => {
        if (this.isMounted && this.props.type === iconType) {
          this.setState(
            {
              icon,
              iconTitle: iconType,
              isLoading: false,
            },
            this.onIconLoad
          );
        }
      });
    });
  };

  onIconLoad = () => {
    const { onIconLoad } = this.props;
    if (onIconLoad) {
      onIconLoad();
    }
  };

  render() {
    const {
      type,
      size = 'm',
      color,
      className,
      tabIndex,
      title,
      onIconLoad,
      ...rest
    } = this.props;

    const { isLoading, neededLoading } = this.state;

    let optionalColorClass = null;
    let optionalCustomStyles: any = null;

    if (color) {
      if (isNamedColor(color)) {
        optionalColorClass = colorToClassMap[color];
      } else {
        optionalCustomStyles = { color: color };
        optionalColorClass = 'ouiIcon--customColor';
      }
    }

    // These icons are a little special and get some extra CSS flexibility
    const isAppIcon =
      type &&
      typeof type === 'string' &&
      (/.+App$/.test(type) || /.+Job$/.test(type) || type === 'dataVisualizer');

    const appIconHasColor = color && color !== 'default';

    // parent is not one of
    const classes = classNames(
      'ouiIcon',
      sizeToClassNameMap[size],
      optionalColorClass,
      {
        // The app icon only gets the .ouiIcon--app class if no color is passed or if color="default" is passed
        'ouiIcon--app': isAppIcon && !appIconHasColor,
        'ouiIcon-isLoading': isLoading,
        'ouiIcon-isLoaded': !isLoading && neededLoading,
      },
      className
    );

    const icon = this.state.icon || (defaultIcon as ComponentType);

    // This is a fix for IE and Edge, which ignores tabindex="-1" on an SVG, but respects
    // focusable="false".
    //   - If there's no tab index specified, we'll default the icon to not be focusable,
    //     which is how SVGs behave in Chrome, Safari, and FF.
    //   - If tab index is -1, then the consumer wants the icon to not be focusable.
    //   - For all other values, the consumer wants the icon to be focusable.
    const focusable = tabIndex == null || tabIndex === -1 ? 'false' : 'true';

    // relative, absolute path
    if (typeof icon === 'string') {
      return (
        <img
          alt={title ? title : ''}
          src={icon}
          className={classes}
          tabIndex={tabIndex}
          {...(rest as HTMLAttributes<HTMLImageElement>)}
        />
      );
    } else {
      const Svg = icon;

      // If it's a default icon, or if there is no aria-label, aria-labelledby, or title it gets aria-hidden true
      const isAriaHidden =
        icon === defaultIcon ||
        !(
          this.props['aria-label'] ||
          this.props['aria-labelledby'] ||
          this.props.title
        );
      const hideDefaultIcon = isAriaHidden && { 'aria-hidden': true };

      let titleId: any;

      // If no aria-label or aria-labelledby is provided but there's a title, a titleId is generated
      //  The svg aria-labelledby attribute gets this titleId
      //  The svg title element gets this titleId as an id
      if (
        !this.props['aria-label'] &&
        !this.props['aria-labelledby'] &&
        title
      ) {
        titleId = { titleId: generateId() };
      }

      return (
        <Svg
          className={classes}
          style={optionalCustomStyles}
          tabIndex={tabIndex}
          focusable={focusable}
          role="img"
          title={title}
          {...titleId}
          {...rest}
          {...hideDefaultIcon}
        />
      );
    }
  }
}
