# This is a text for xejs

This plain text <p> should not </p> be parsed

Tags test

{{ date}}
{{date}}

{{   DATE    }}

false tags

{{ not tag }}

{{ not DATE }}

{{DATE not}}

{{
    Date
    }}

<% should not parse EJS%>

comment tag{{# this is a comment}}end comment tag

Include test

{{Include xejs_test2.md}}


End of first file
