import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleted } from '../reducers/contactsSlice';

const contacts = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const contacts: any = useSelector((state: any) => state.contacts)

  const handleDelete = (id: any) => {
    dispatch(deleted({ id: id }))
    navigate(`/`)
  }

  return (
    <div className="flex flex-row flex-wrap mb-5">
      {contacts.map((item: any) => (
        <div key={item.name} className="flex align-items-center justify-content-center m-3">
          <Card title={item.name} className='w-16rem'>
            <p>Telefono: {item.phone}</p>
            <Button onClick={() => handleDelete(item.id)} label="Eliminar" className="mt-3" size="small" severity="danger" outlined />
          </Card>
        </div>
      ))}
    </div>
  );
};

export default contacts;