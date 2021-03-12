<template>
<div class="contactList">
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>E-Mail</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-bind:key="contact.id" v-for="contact in contacts">
                <td>{{contact.name}}</td>
                <td>{{contact.phone}}</td>
                <td>{{contact.email}}</td>
                <td><img alt="delete" 
                         src="../assets/delete.png" 
                         class="delete"
                         @click="$emit('delete-contact', contact.id)" /></td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
export default {
    name: 'ContactList',
    props: {
        contacts: Array
    }
}
</script>

<style scoped lang="scss">
.contactList {
    padding: 1rem;

    table {
        border: 2px solid #1673bd;
        border-radius: 3px;
        background-color: #fff;
        margin-left: auto;
        margin-right: auto;
        font-size: 90%;

        th {
            background-color: #2c3e50;
            color: rgba(255,255,255,0.65);
        }

        td {
            background-color: #f9f9f9;

            .delete {
                width: 1rem;
                height: auto;
                cursor: pointer;
            }
        }
    }
}

</style>