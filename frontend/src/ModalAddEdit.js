import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import InputMask from "react-input-mask";
import axios from 'axios'

export default function ModalAddEdit({ modalVisible, closeModal, paciente }) {

    const [nome, setnome] = useState('');
    const [idade, setidade] = useState('')
    const [dataNasc, setdataNasc] = useState('');


    const salvar = async () => {

        if (paciente !== null) {
            const response = await axios.put(`/pacientes/${paciente._id}`,{ nome, idade, dataNasc})
            closeModal()
        }else{
            const response = await axios.post('/pacientes',{ nome, idade, dataNasc})
            closeModal()
        }
    }

    const fetchData = () => {
        if (paciente !== null) {
            setnome(paciente.nome)
            setidade(paciente.idade)
            setdataNasc(paciente.dataNasc)
        }

    }

    useEffect(() => {
        fetchData()
    }, [paciente]);

    return (
        <Modal
            isOpen={modalVisible}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >

            <h3>Cadastro e Edição de Pacientes</h3>
            <hr />
            <form>
                <div className="form-group">
                    <label>Nome</label>
                    <input type="text" name="nome" value={nome} onChange={(e) => setnome(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Idade</label>
                    <input type="text" name="nome" value={idade} onChange={(e) => setidade(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Data de Nascimento</label>
                    <InputMask mask="99/99/9999" name="dataNact" onChange={(e) => setdataNasc(e.target.value)} value={dataNasc} className="form-control" />
                </div>
                <button type="button" onClick={salvar} className="btn btn-success mr-2">Salvar</button>
                <button type="button" onClick={closeModal} className="btn btn-danger">Cancelar</button>
            </form>

        </Modal>
    )
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};