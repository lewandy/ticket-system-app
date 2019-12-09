export const ModalFeaturesMixin =  {
    data() {
        return {
            isModalOpen : false
        }
    },
    methods: {
        showModal() {
            this.isModalOpen = true;
        },
        hideModal() {
            this.isModalOpen = false;
        }
    }
}