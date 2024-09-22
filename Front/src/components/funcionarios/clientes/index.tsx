import { useEffect, useState } from "react"
import { api } from "../../../services/api"
import { IUsers } from "../../../interfaces/Users"
import styles from './clientes.module.css'





export const Clientes = () => {

    const [users, setUsers] = useState<IUsers[]>([])
    const [search, setSearch] = useState('')


    const getClientes = async () => {
        try {
            const response = await api.get('/usuariosTipo')
            setUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getClientes()
    }, [])


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const filteredUsers = users.filter(user =>
        user.nome.toLowerCase().includes(search.toLowerCase())
    )



    return (
        <div className={styles.content}>
            <div className={styles.searchContainer}>
                <button className={styles.addButton}>
                    <i className="fas fa-plus"></i> Cadastrar
                </button>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Buscar.."
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Visualizar</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.nome}</td>
                            <td>{user.email}</td>
                            <td>{user.telefone}</td>
                            <td>
                                <span className={styles['edit-icon']}>
                                    <i className="fas fa-eye"></i>
                                </span>
                            </td>
                            <td>
                                <span className={styles['edit-icon']}>✏️</span>
                            </td>
                            <td>
                                <span className={styles['delete-icon']}>🗑️</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
