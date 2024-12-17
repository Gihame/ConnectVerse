interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  profile: Profile;
  posts: Post[];
  tweet: Tweet[];
  likes: Like[];
  enabled: boolean;
  authorities: Authority[];
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  accountNonLocked: boolean;
}

interface Profile {
  profileId: number;
  fullName: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  profileImageUrl: string;
  gender: string;
  joinDate: string;
}

interface Post {
  id: number;
  content: string;
  category: string;
  headline: string;
  createdAt: string;
  updatedAt: string;
}

interface Tweet {
  tweet_id: number;
  message: string;
  imageUrl: string | null;
  videoUrl: string | null;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  likes: Like[];
  comments: Comment[];
}

interface Like {
  id: number;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
}

interface Authority {
  authority: string;
}

export default User;