import React, { useState } from 'react'
import styles from './tabs.module.css';
import { Agendar } from '..';
import { Agendamentos } from '../agendamentos';





export const MainTab = () => {
    const [activeTab, setActiveTab] = useState('agendar')

    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.tabHeader}>
                <button className={activeTab === 'agendar' ? styles.active : ''} onClick={() => handleTabChange('agendar')}>
                    Agendar
                </button>
                <button className={activeTab === 'agendamentos' ? styles.active : ''} onClick={() => handleTabChange('agendamentos')}>
                    Agendamentos
                </button>
            </div>

            
            <div>
                    {activeTab === 'agendar' && <Agendar />}
                    {activeTab === 'agendamentos' && <Agendamentos />}
                </div>
        </div>
    )
}
