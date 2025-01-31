export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'magazine_pdf',
      title: 'Magazine pdf',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
  ],
}
