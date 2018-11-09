import { expect } from 'chai';
import { initialize } from 'ember-responsive-image/instance-initializers/responsive-meta';
import {
  setupRenderingTest,
  it
} from 'ember-mocha';
import { render, find } from '@ember/test-helpers';
import {
  before,
  describe
} from 'mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration: ResponsiveBackgroundComponent',
  function() {
    setupRenderingTest();
    before(function() {
      initialize();
    });

    it('renders with backround url', async function() {
      await render(hbs`{{responsive-background image="test.png"}}`);
      expect(find('div').getAttribute('style')).to.equal('background-image: url(\'/assets/images/responsive/test100w-00e24234f1b58e32b935b1041432916f.png\');');
    });

    it('it renders the background url next to needed display size', async function() {
      this['responsive-image'] = this.owner.lookup('service:responsive-image');
      this.get('responsive-image').set('physicalWidth', 45);
      await render(hbs`{{responsive-background image="test.png"}}`);
      expect(find('div').getAttribute('style')).to.equal('background-image: url(\'/assets/images/responsive/test50w-00e24234f1b58e32b935b1041432916f.png\');');
      this.get('responsive-image').set('physicalWidth', 51);
      await render(hbs`{{responsive-background image="test.png"}}`);
      expect(find('div').getAttribute('style')).to.equal('background-image: url(\'/assets/images/responsive/test100w-00e24234f1b58e32b935b1041432916f.png\');');
    });

    it('it renders the background url next to given render size', async function() {
      this['responsive-image'] = this.owner.lookup('service:responsive-image');
      this.get('responsive-image').set('physicalWidth', 100);
      this.set('size', 45);
      await render(hbs`{{responsive-background image="test.png" size=size}}`);
      expect(find('div').getAttribute('style')).to.equal('background-image: url(\'/assets/images/responsive/test50w-00e24234f1b58e32b935b1041432916f.png\');');
      this.set('size', 51);
      expect(find('div').getAttribute('style')).to.equal('background-image: url(\'/assets/images/responsive/test100w-00e24234f1b58e32b935b1041432916f.png\');');
    });
  }
);
