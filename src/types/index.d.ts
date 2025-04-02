type Item = {
  _id: string;
  title: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
  };
  images: string[];
};

type CardProps = {
  item: Item;
  onClick?: () => void;
};
