import { useEffect, useState } from 'react';
import React from 'react';

const withAuthRedirect = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  redirectPath: string = '/perfil'
) => {
  const ComponentWithAuthRedirect: React.FC<P> = (props: P) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      // Verificar se estamos no lado do cliente
      if (typeof window !== 'undefined') {
        const userEmail = sessionStorage.getItem('userEmail');
        const placa = sessionStorage.getItem('veiculoPlaca');

        // Redirecionar somente se o userEmail e a placa existirem no sessionStorage
        if (userEmail && placa) {
          window.location.href = redirectPath;
        }

        setMounted(true); // Sinaliza que estamos no cliente
      }
    }, [redirectPath]);

    if (!mounted) {
      return null; // Ou pode retornar um spinner/loader aqui
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuthRedirect;
};

export default withAuthRedirect;
