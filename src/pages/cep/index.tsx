import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
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
        } 
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>CEP</Text>
            <TextInput
                style={styles.input}
                keyboardType={'number-pad'}
                maxLength={8}
                value={cep}
                onChangeText={(value) => setCep(value)}
                onSubmitEditing={getCep}
            />

            <View>
                <Text>{`UF: ${objCep.estado}`}</Text>
                <Text>{`Bairro: ${objCep.bairro}`}</Text>
            </View>
        </View>
    );
}