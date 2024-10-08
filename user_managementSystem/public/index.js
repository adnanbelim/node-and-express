$(document).ready(function () {
    // Destroy DataTables
    if ($.fn.DataTable.isDataTable('#myTable')) {
        $('#myTable').DataTable().destroy();
    }

    // Re-initialize DataTables with responsive and other settings
    $('#myTable').DataTable({
        "responsive": true,
        "scrollY": false,
    });
});

