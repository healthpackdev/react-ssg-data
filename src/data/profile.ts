const staticRouteData = () => {
  return {
    users: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john_doe@mail.com',
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane_doe@mail.com',
      },
    ],
    buildTime: new Date(),
  };
};

export default staticRouteData;
