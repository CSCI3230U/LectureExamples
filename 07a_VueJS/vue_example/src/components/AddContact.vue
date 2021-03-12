<template>
<div id="addContact">
    <form @submit="addContact">
        <input type="text" v-model="name" name="name" placeholder="Full Name" />
        <input type="text" v-model="phone" name="phone" placeholder="Phone #" />
        <input type="text" v-model="email" name="email" placeholder="E-Mail Address" />
        <button class="btn">Add Contact</button>
    </form>
</div>
</template>

<script>
export default {
    name: 'AddContact',
    data() {
        return {
            name: '',
            phone: '',
            email: ''
        };
    },
    methods: {
        addContact(event) {
            // prevent form submit
            event.preventDefault();

            // collect the data
            const newContact = {
                name: this.name,
                phone: this.phone,
                email: this.email
            };

            // propagate this event up to the parent
            this.$emit('add-contact', newContact);

            // clear the form for another addition
            this.name = '';
            this.phone = '';
            this.email = '';
        }
    }
}
</script>

<style scoped lang="scss">
#addContact {
    form {
        margin-top: 1rem;
        margin-bottom: 1rem;

        input[type="text"] {
            padding: 5px;
        }
    }
}
</style>