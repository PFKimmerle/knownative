export default async function sendRequest(
  url,
  method = 'GET',
  payload = null,
  extraHeaders = {}
) {
  const options = { method, headers: { ...extraHeaders }, credentials: 'include' };

  if (payload) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(payload);
  }

  const res = await fetch(url, options);
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}
