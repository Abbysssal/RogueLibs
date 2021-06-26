import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Translate, {translate} from '@docusaurus/Translate';

const FeatureList = [
  {
    title: (
      <Translate id="features.easy.title">
        Easy to Use
      </Translate>
    ),
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <Translate id="features.easy.description">
        RogueLibs does all of the patching for you!
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="features.focus.title">
        Focus on What Matters
      </Translate>
    ),
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <span>
        <Translate id="features.focus.description">
          Let RogueLibs handle the hard work, and
        </Translate>
        {' '}
        <b>
          <Translate id="features.focus.description.bold">
            you just focus on the content!
          </Translate>
        </b>
      </span>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
