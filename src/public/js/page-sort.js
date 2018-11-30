$('tbody').sortable({
  items: "tr:not('.home')",
  placeholder: "bg-warning reorder",
  update: function() {
    const ids = $('tbody').sortable("serialize");
    const url = "/dashboard/pages/reorder-pages";
    console.log(ids)
    $.post(url, ids);
  }
});
