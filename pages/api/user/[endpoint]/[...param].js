import  {allUsers} from '../../../../data.js'

export default function userEnpoint(req, res) {
  console.log('req ', req)
  let {query, method} = req;
  console.log('endpoint ', query.endpoint, ' query param ', query.param)
  switch (query.endpoint){
    case 'getAllUsers':
      res.status(200).json(allUsers)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end('endpoint not valid')
  }
    // switch (method) {
    //   case 'GET':
    //     // Get data from your database
    //     res.status(200).json({ id, name: `User ${id}` })
    //     break
    //   case 'PUT':
    //     // Update or create data in your database
    //     res.status(200).json({ id, name: name || `User ${id}` })
    //     break
    //   default:
    //     res.setHeader('Allow', ['GET', 'PUT'])
    //     res.status(405).end(`Method ${method} Not Allowed`)
    // }
  }