const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: '13saj5pz',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03'
});

client.fetch('*[_type == "product"]{name, price}').then(res => console.log(JSON.stringify(res, null, 2))).catch(console.error);
