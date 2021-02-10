var provinces = {
    CA: ['Alberta', 'BC', 'Manitoba', 'Ontario'],
    US: ['Alabama', 'Alaska', 'Arkansas'],
};

$(document).ready(function() {
    $('#register').click(function() {
        console.log('Register button clicked');
        return false;
    });

    $('#register').dblclick(function() {
        console.log('Register button double clicked');
        return false;
    });

    $('#email').mouseenter(function() {
        console.log('mouse in');
    });

    $('#email').mouseleave(function() {
        console.log('mouse out');
    });

    $('#email').focus(function() {
        console.log('got focus');
    });

    $('#email').change(function() {
        let email = $('#email').val();
        if (email === '') {
            $('#email').css({backgroundColor: 'red'});
            $('#email').attr('class', 'error');
        } else {
            $('#email').css({backgroundColor: 'green'});
            $('#email').attr('class', '');
        }
    });

    $('#country').change(function() {
        let country = $('#country').val();
        let provs = provinces[country];

        let content = '';
        $.each(provs, function(index, value) {
            content += `<option>${value}</option>`;
        });
        $('#province').html(content);
    }).change();
});
