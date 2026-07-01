export async function GET(request) {
  const orders = [
    { id: 1, customerName: "Acme Corp", value: 450, status: "completed" },
    { id: 2, customerName: "StartupXY", value: 120, status: "pending" },
    { id: 3, customerName: "Big Bank", value: 980, status: "completed" },
  ]
  
  return Response.json({ orders })
}