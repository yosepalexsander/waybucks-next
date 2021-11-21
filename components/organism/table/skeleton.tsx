import Button from '@/components/atoms/button'

export default function TableSkeleton() {
  const render = () => {
    let elements = []
    for(let i = 0; i < 5; i++) {
      elements.push(
        <tr key={i} className="skeleton skeleton-wave">
          <td><span className="h-7 w-4/5"></span></td>
          <td className="table-name"><span className="left w-4/5 h-7"></span></td>
          <td className="table-image"><span className="w-full h-full"></span></td>
          <td className="table-price"><span className="h-7 w-4/5"></span></td>
          <td><span className="h-7 w-7"></span></td>
          <td>
            <Button id="update-skeleton" 
              variant="contained" color="secondary" 
              className="m-1 w-20"
              style={{padding: '0.25rem'}}
              disabled
            >Update</Button>
            <Button id="delete-skeleton" 
              variant="outlined" color="danger" 
              className="m-1 w-20"
              style={{padding: '0.25rem'}}
              disabled
            >Delete</Button>
          </td>
        </tr>
      )
    }
    return elements
  }
  return (
    <>
      {render()}
    </>
  )
}