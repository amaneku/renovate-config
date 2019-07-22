const assert = require("assert");
const { migrateAndValidate } = require("renovate/dist/config/migrate-validate");

describe('@amaneku/renovate-config', () => {
  let pkg, renovateConfig;
  before(() => {
    pkg = require('../package.json');
    renovateConfig = pkg['renovate-config'];
  });
  after(() => {
    pkg = null;
    renovateConfig = null;
  });

  it('package.json has "renovate-config"', () => {
    assert(renovateConfig);
  });

  it(`"renovate-config" has "default"`, async () => {
    assert(renovateConfig["default"]);
  });

  it(`"default" is valid`, async () => {
    const config = renovateConfig["default"];
    const { errors, warnings } = await migrateAndValidate({}, config);
    assert.deepEqual(errors, []);
    assert.deepEqual(warnings, []);
  });
});

describe('renovate.json', () => {
  it('validate', async () => {
    const config = require('../renovate.json');
    const { errors, warnings } = await migrateAndValidate({}, config);
    assert.deepEqual(errors, []);
    assert.deepEqual(warnings, []);
  });
});
