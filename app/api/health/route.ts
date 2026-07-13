/**
 * GET /api/health
 * Health check endpoint for monitoring and deployments
 */
export async function GET(): Promise<Response> {
  return Response.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache',
      },
    }
  )
}
