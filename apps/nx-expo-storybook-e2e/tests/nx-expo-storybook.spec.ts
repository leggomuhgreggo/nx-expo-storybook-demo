import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('nx-expo-storybook e2e', () => {
  it('should create nx-expo-storybook', async () => {
    const plugin = uniq('nx-expo-storybook');
    ensureNxProject(
      '@expo-storybook/nx-expo-storybook',
      'dist/libs/nx-expo-storybook'
    );
    await runNxCommandAsync(
      `generate @expo-storybook/nx-expo-storybook:nx-expo-storybook ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');
  }, 120000);

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const plugin = uniq('nx-expo-storybook');
      ensureNxProject(
        '@expo-storybook/nx-expo-storybook',
        'dist/libs/nx-expo-storybook'
      );
      await runNxCommandAsync(
        `generate @expo-storybook/nx-expo-storybook:nx-expo-storybook ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async () => {
      const plugin = uniq('nx-expo-storybook');
      ensureNxProject(
        '@expo-storybook/nx-expo-storybook',
        'dist/libs/nx-expo-storybook'
      );
      await runNxCommandAsync(
        `generate @expo-storybook/nx-expo-storybook:nx-expo-storybook ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
