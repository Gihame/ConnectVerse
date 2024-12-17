import User from "../types/userType";

export const user: User = {
  id: 1,
  username: "tuyishimekyrie@gmail.com",
  firstname: "Tuyishime",
  lastname: "kyrie",
  email: "tuyishimekyrie@gmail.com",
  password: "$2a$10$RWNm9j6Yl9CLfvpylw3YfeeWQcW2nLrFjm/D27uHBbaFiU7WrCBmu",
  role: "USER",
  profile: {
    profileId: 1,
    fullName: "John Doe",
    username: "tuyishimekyrie",
    bio: "Software Engineer",
    location: "New York",
    website: "https://example.com",
    profileImageUrl:
      "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
    gender: "Male",
    joinDate: "2024-05-22",
  },
  posts: [
    {
      id: 1,
      content: "#Marvels",
      category: "Trending",
      headline: "Entertainment",
      createdAt: "2024-05-22T15:06:16.778029",
      updatedAt: "2024-05-22T15:06:16.778029",
    },
    {
      id: 2,
      content: "#Extraction",
      category: "Trending",
      headline: "Movie",
      createdAt: "2024-05-22T15:11:09.091824",
      updatedAt: "2024-05-22T15:11:09.091824",
    },
  ],
  tweet: [
    {
      tweet_id: 2,
      message: "Hello From connectverse",
      imageUrl: null,
      videoUrl: null,
      createdAt: "2024-05-22T20:55:44.398027",
      updatedAt: "2024-05-22T20:55:44.398027",
      likesCount: 0,
      likes: [],
      comments: [],
    },
    {
      tweet_id: 1,
      message: "Hello From connectverse",
      imageUrl: null,
      videoUrl: null,
      createdAt: "2024-05-22T20:40:18.316992",
      updatedAt: "2024-05-23T11:45:05.496133",
      likesCount: 2,
      likes: [
        {
          id: 6,
        },
        {
          id: 7,
        },
      ],
      comments: [
        {
          id: 1,
          content: '{\r\n    "content": "This is a comment on the tweet."\r\n}',
          createdAt: "2024-05-23T11:59:28.695277",
        },
        {
          id: 2,
          content: '{\r\n    "content": "This is a comment on the tweet."\r\n}',
          createdAt: "2024-05-23T12:02:28.351498",
        },
        {
          id: 3,
          content: "This is a comment on the tweet.\r\n",
          createdAt: "2024-05-23T12:02:54.890797",
        },
        {
          id: 4,
          content: "This is a comment on the tweet.",
          createdAt: "2024-05-23T12:10:17.185488",
        },
      ],
    },
  ],
  likes: [
    {
      id: 6,
    },
  ],
  enabled: true,
  authorities: [
    {
      authority: "USER",
    },
  ],
  accountNonExpired: true,
  credentialsNonExpired: true,
  accountNonLocked: true,
};
