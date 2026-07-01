export async function POST(request) {
  const body = await request.json()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const errors = {}

    if (body.fullName.trim().length < 2) {
    errors.fullName = 'Name must be at least 2 characters'
    }
    if (!emailRegex.test(body.email)) {
    errors.email = 'Please enter a valid email'
    }
    if (body.desc.trim().length < 10) {
    errors.desc = 'Message must be at least 10 characters'
    }

    if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 400 })
    }

    
  console.log('body', body)

  
  
  return Response.json({ message: 'Enquiry received' }, { status: 200 })
}