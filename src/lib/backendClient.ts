export async function fetchBackend(
  path: string,
  options?: RequestInit
): Promise<Response> {
  const url = `${process.env.BACKEND_URL}${path}`
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BACKEND_API_KEY}`,
      ...options?.headers,
    },
  })
}
