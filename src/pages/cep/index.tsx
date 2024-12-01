import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { styles } from './styles';
import axios from 'axios';
import { ICep } from '../../@types';

export function Cep() 
{

    const [cep, setCep] = useState<string>('');
    const [objCep, setObjCep] = useState<ICep>({} as ICep);

    const getCep = async () =>
    {
        if (cep?.length == 8)
        {
            axios
            .get<ICep>(`${cep}/json`) 
            .then(res => 
            {
                if(res.data)
                {
                    setObjCep(res.data);
                    res.data.erro ? Alert.alert('Atenção!', 'CEP não encontrado') : null;
                }
            })
            .catch(() =>
            {
                setObjCep({} as ICep);
                alert('CEP inválido!');
            })
        }
        else
        {
            setObjCep({} as ICep);
            console.log(objCep);
            Alert.alert("Atenção! " + "\nFormato de CEP inválido!");
        } 
    }

    return (
        <View style={styles.container}>

            <Text style={styles.label}>Digite um CEP</Text>
            <TextInput
                style={styles.input}
                keyboardType={'number-pad'}
                maxLength={8}
                value={cep}
                onChangeText={(value) => setCep(value)}
                onSubmitEditing={getCep}
            />

            <View style={styles.info}>
                {objCep.uf ? <Text style={styles.infoText}>{`UF: ${objCep.estado}`}</Text> : <Text style={styles.infoText}>{`UF: `}</Text>} 
                {objCep.localidade ? <Text style={styles.infoText}>{`Cidade: ${objCep.localidade}`}</Text> : <Text style={styles.infoText}>{`Cidade: `}</Text>}
                {objCep.bairro ? <Text style={styles.infoText}>{`Bairro: ${objCep.bairro}`}</Text> : (Object.keys(objCep).length === 0 || objCep.erro) ? <Text style={styles.infoText}>{`Bairro: `}</Text> : <Text style={styles.infoText}>{`Bairro: Cidade com CEP único.`}</Text>}
                {objCep.logradouro ? <Text style={styles.infoText}>{`Logradouro: ${objCep.logradouro}`}</Text> : Object.keys(objCep).length === 0 ? <Text style={styles.infoText}>{`Logradouro: `}</Text> : <Text style={styles.infoText}>{`Logradouro: Cidade com CEP único.`}</Text>}
            </View>

        </View>
    );
}