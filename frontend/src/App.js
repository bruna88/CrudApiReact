import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ModalAddEdit from './ModalAddEdit'
export default function App() {

  const [lista, setlista] = useState([])
  const [modalVisible, setmodalVisible] = useState(false)
  const [paciente, setpaciente] = useState(null)

  const editar = async (paciente) => {
    setpaciente(paciente)
    setmodalVisible(true)
  }

  const closeModal = () => {
    fetchData()
    setmodalVisible(false)
  }

  const remover = async (nome, id) => {
    confirmAlert({
      title: 'Excluir Paciente',
      message: `Excluir ${nome} da sua lista de Paciente ?`,
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            await axios.delete(`/pacientes/${id}`)
            fetchData()
          }
        },
        {
          label: 'Não',
        }
      ]
    });

  }

  const fetchData = async () => {
    const response = await axios.get('/pacientes')
    setlista(response.data.pacientes)
    console.log(response.data.pacientes)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
        <ModalAddEdit modalVisible={modalVisible} closeModal={closeModal} paciente={paciente} />
        <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src="https://www.medcloud.com.br/wp-content/uploads/2019/03/logo-medcloud_Prancheta-1-e1553105285413.png" width="100" alt="" />
        </a>
      </nav>
      <div className="App">
        <div className="home">
          <div className="d-none d-md-block">
            <h3 style={{ color: '#0275d8' }}>Pacientes</h3>
            <p className="lead">Criação, alteração e remoção de pacientes</p>
            <hr />
          </div>
          <button onClick={() => setmodalVisible(true)} type="button" class="btn btn-success btn-lg mb-2">Adicionar</button>
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Idade</th>
                <th scope="col">Data de Nascimento</th>
                <th scope="col">Opção</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((el, i) => {
                return (
                  <tr key={i}>
                    <td scope="row">{el.nome}</td>
                    <td scope="row">{el.idade}</td>
                    <td scope="row">{el.dataNasc}</td>
                    <td>
                      <button type="button" onClick={() => editar(el)} style={{ marginRight: 10 }} class="btn btn-primary">Editar</button>
                      <button type="button" onClick={() => remover(el.nome, el._id)} class="btn btn-danger">Remover</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

