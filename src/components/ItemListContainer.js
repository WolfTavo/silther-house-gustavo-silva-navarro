import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';

import { ItemList } from './ItemList';

import { db } from './firebase/firebase';

export const ItemListContainer = () => {
    const [listProducts, setListProducts] = useState([]);
    const [cargando, setCargando] = useState(true);

    const { categoryProduct } = useParams();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const productsRef = collection(db, 'allProducts');

                if(categoryProduct) {
                    const req = query(productsRef, where('category', "==", categoryProduct));
                    const datos = await getDocs(req);
                    setListProducts(datos.docs.map(doc => (
                        {
                            id: doc.id,
                            ...doc.data()
                        }
                    )));
                } else {
                    const dbData = await getDocs(productsRef);
                    setListProducts(dbData.docs.map(doc => (
                        {
                            id: doc.id,
                            ...doc.data()
                        }
                    )));
                };

                setCargando(false);
            } catch(err) {
                toast.error('Lo sentimos no pudimos obtener los datos', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });    
            };
        };

        getProducts();
    }, [categoryProduct]);

    return (
        <main>
            {(cargando) ? (
                <section className='mt-3'>
                    <div className='d-flex justify-content-center'>
                        <BeatLoader color='#000' loading={cargando} />
                    </div>
                    <h5 className="text-center">Loading...</h5>
                </section>
            ) : (
                <section className='mt-3'>
                    <ItemList products={listProducts} emptyProduct="No se cuentan con Productos" />
                </section>
            ) }
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </main>
    )
};