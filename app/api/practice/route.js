export async function GET(request) {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  ]
  
  return Response.json({ users })
}

export async function POST(request) {
  const body = await request.json()
  
  console.log('body', body)


  return Response.json({ message: 'Enquiry received' }, { status: 201 })
}

export async function PUT(request) {
  const body = await request.json()
  
  console.log('body', body)


  return Response.json({ message: 'Enquiry updated' }, { status: 200 })
}

export async function DELETE(request) {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')


  return Response.json({ message: `User ${id} deleted` }, { status: 200 })
}