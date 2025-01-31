export const allPostsQuery = () => {
  const query = `*[_type == "post"] | order(_createdAt desc){
    _id,
    description,
    magazine_pdf{
      asset->{
        _id,
        url
      }
    },
    thumbnail{
      asset->{
        url
      }
    },
  }`;

  return query;
};

export const postDetailQuery = (magazineId: string | string[] | undefined) => {
  const query = `*[_type == "post" && _id == '${magazineId}']{
    _id,
    description,
    magazine_pdf{
      asset->{
        _id,
        url
      }
    },
    thumbnail{
      asset->{
        url
      }
    },
  }`;

  return query;
};

export const topicPostsQuery = (category: string | string[] | undefined) => {
  const query = `*[_type == "post" && category match '${category}*'] {
    _id,
    description,
    magazine_pdf{
      asset->{
        _id,
        url
      }
    },
    thumbnail{
      asset->{
        url
      }
    },
  }`;

  return query;
};

export const searchPostsQuery = (searchTerm: string | string[] | undefined) => {
  const query = `*[_type == "post" && description match '${searchTerm}*' || category match '${searchTerm}*'] {
    _id,
    description,
    magazine_pdf{
      asset->{
        _id,
        url
      }
    },
    thumbnail{
      asset->{
        url
      }
    },
  }`;
  return query;
};

export const allUsersQuery = () => {
  const query = `*[_type == "user"]`;

  return query;
};
