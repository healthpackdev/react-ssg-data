const staticRouteData = async () => {
  return {
    repos: [
      {
        name: 'repo1',
        description: 'repo1 description',
        url: 'https://github.com/user1/repo1',
      },
      {
        name: 'repo2',
        description: 'repo2 description',
        url: 'https://github.com/user2/repo2',
      },
    ],
  };
};
export default staticRouteData;
