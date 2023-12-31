

describe('Cadastro', () => {
    it('Usuário deve se tornar um entregador', () => {
        cy.visit('https://buger-eats.vercel.app');

        // Página de entrega
        cy.get('a[href="/deliver"]').click();
        cy.get('#page-deliver form h1').should('include.text', 'Cadastre-se para  fazer entregas');

        // Dados do entregador
        var deliver = {
            name: 'Fernando Papito',
            cpf: '00000014141',
            email: 'papito@hotmail.com',
            whatsapp: '11999999999',
            address: {
                postalcode: '04534011',
                street: 'Rua Joaquim Floriano',
                number: '1000',
                details: 'Ap 142',
                district: 'Itaim Bibi',
                city_state: 'São Paulo/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        };

        // Preencher formulário
        cy.get('input[name="name"]').type(deliver.name);
        cy.get('input[name="cpf"]').type(deliver.cpf);
        cy.get('input[name="email"]').type(deliver.email);
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp);

        // Buscar CEP
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode);
        cy.get('input[type=button][value="Buscar CEP"]').click();
        cy.wait(2000);

        // Preencher endereço
        cy.get('input[name="address-number"]').type(deliver.address.number);
        cy.get('input[name="address-details"]').type(deliver.address.details);

        // Verificar valores do endereço
        cy.get('input[name="address"]').should('have.value', deliver.address.street);
        cy.get('input[name="district"]').should('have.value', deliver.address.district);
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state);

        // Selecionar método de entrega
        cy.contains('.delivery-method li', deliver.delivery_method).click();

        // Anexar arquivo da CNH
        cy.get('input[accept^="image"]').attachFile('images/' + deliver.cnh);

        // Submeter formulário
        cy.get('form button[type="submit"]').click();

        // Verificar mensagem esperada
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.';
        cy.get('.swal2-container .swal2-html-container').invoke('text').should('include', expectedMessage.trim());
    });

    it('CPF incorreto', () => {
        cy.viewport(1440, 900);
        cy.visit('https://buger-eats.vercel.app');

        // Página de entrega
        cy.get('a[href="/deliver"]').click();
        cy.get('#page-deliver form h1').should('include.text', 'Cadastre-se para  fazer entregas');

        // Dados do entregador com CPF incorreto
        var deliver = {
            name: 'Fernando Papito',
            cpf: '000000141AA',
            email: 'papito@hotmail.com',
            whatsapp: '11999999999',
            address: {
                postalcode: '04534011',
                street: 'Rua Joaquim Floriano',
                number: '1000',
                details: 'Ap 142',
                district: 'Itaim Bibi',
                city_state: 'São Paulo/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        };

        // Preencher formulário
        cy.get('input[name="name"]').type(deliver.name);
        cy.get('input[name="cpf"]').type(deliver.cpf);
        cy.get('input[name="email"]').type(deliver.email);
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp);

        // Buscar CEP
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode);
        cy.get('input[type=button][value="Buscar CEP"]').click();

        // Preencher endereço
        cy.get('input[name="address-number"]').type(deliver.address.number);
        cy.get('input[name="address-details"]').type(deliver.address.details);

        // Verificar valores do endereço
        cy.get('input[name="address"]').should('have.value', deliver.address.street);
        cy.get('input[name="district"]').should('have.value', deliver.address.district);
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state);
    });
});