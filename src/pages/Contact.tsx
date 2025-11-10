import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { created, deleted, edited } from "../reducers/contactsSlice";

const Contact = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const ContactsData: any = useSelector((state: any) => state.contacts)

  const [name, setName] = useState(id ? ContactsData.find((val: any) => val.id == id).name : '');
  const [phone, setPhone] = useState(id ? ContactsData.find((val: any) => val.id == id).phone : '');

  const handleSubmit = () => {
    if (id) {
      dispatch(edited({
        id: ContactsData.find((val: any) => val.id == id).id,
        phone: phone,
        name: name
      }))
    } else {
      dispatch(created({
        id: Math.floor(Date.now() * Math.random()),
        phone: phone,
        name: name
      }))
    }
    navigate(`/`)
  }
  
  const handleDelete = () => {
    if (id) dispatch(deleted({ id: id }))
    navigate(`/`)
  }

  return (
    <div>
      <div className="flex flex-row flex-wrap align-items-center px-3" style={{ backgroundColor: 'var(--primary-color)', color: 'var(--primary-color-text)' }}>
        <Button onClick={() => navigate("/")} icon="pi pi-arrow-left" rounded raised aria-label="arrow-left" />
        <h1 className="ml-3">Nuevo contacto</h1>
      </div>
      <div className="flex flex-column flex-wrap p-3 mt-3">
        <div className="flex-auto mb-5">
          <label htmlFor="calendar-24h" className="font-bold block mb-2">
              Nombre y apellido
          </label>
          <InputText value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex-auto mb-5">
          <label htmlFor="calendar-24h" className="font-bold block mb-2">
              Teléfono
          </label>
          <InputText value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="flex-auto">
        	<Button onClick={handleSubmit} label="Guardar" className="mt-3" />
					<Button onClick={handleDelete} label="Eliminar" className="ml-3" severity="danger" outlined disabled={id ? false : true} />
        </div>
      </div>
    </div>
  );
};

export default Contact;