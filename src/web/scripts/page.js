$(window).on('load', function() {
    $.getJSON('/users', function(users) {
        users.forEach(user => {
            const items = [
                `<td>${user.origin_id}</td>`,
                `<td>${user.first_name}</td>`,
                `<td>${user.last_name}</td>`,
                `<td>${user.email}</td>`
            ];
            $( "<tr/>", {
                html: items.join( "" )
            }).appendTo( "table.users tbody" );
        });
    });

    $.getJSON('/stats', function(stats) {
        stats.forEach(stat => {
            const items = [
                `<td>${moment(stat.date).format('MM/DD/YYYY')}</td>`,
                `<td>${stat.commissions_total}</td>`,
                `<td>${stat.sales_net}</td>`,
                `<td>${stat.leads_net}</td>`,
                `<td>${stat.clicks}</td>`,
                `<td>${stat.impressions}</td>`,
                `<td>${stat.epc}</td>`,
                `<td>${stat.cr}</td>`,
            ];
            $( "<tr/>", {
                html: items.join( "" )
            }).appendTo( "table.stats tbody" );
        });
    });
});
