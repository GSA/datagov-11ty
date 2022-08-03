---
author: admin
categories:
- arctic
- climate
- coastalflooding
- ecosystem-vulnerability
- energy-infrastructure
- foodresilience
- humanhealth
- transportation
- tribal-nations
- water
excerpt: |-
  Main Page for Climate updates
link: https://www.data.gov/climate/

pagination:
  data: collections.climate
  size: 2
  alias: posts
  reverse: true
permalink: "/climate/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber | plus: 1 }}/index.html{% endif %}"

redirect_from:
- /arctic/
- /climate/arctic/
- /climate/coastalflooding/
- /climate/ecosystem-vulnerability/
- /climate/energy-infrastructure/
- /climate/foodresilience/
- /climate/humanhealth/
- /climate/transportation/
- /climate/tribal-nations/
- /climate/water/
- /coastalflooding/
- /ecosystem-vulnerability/
- /energy-infrastructure/
- /foodresilience/
- /humanhealth/
- /transportation/
- /tribal-nations/
- /water/

slug: climate

title: Climate
---

{%- for post in posts %}
## [{{ post.data.title }}]({{ post.url }})
{{ post.data.date }} By {{ post.data.author }}
{{ post.data.excerpt }}
{%- endfor %}

<nav aria-labelledby="my-pagination">
  <ol>
    <li>{% if page.url != pagination.href.first %}<a href="{{ pagination.href.first }}">1</a>{% else %}1{% endif %}</li>
    <li>{% if pagination.href.previous %}<a href="{{ pagination.href.previous }}">Previous</a>{% else %}Previous{% endif %}</li>
{%- for pageEntry in pagination.pages %}
{%- endfor %}
    <li>{% if pagination.href.next %}<a href="{{ pagination.href.next }}">Next</a>{% else %}Next{% endif %}</li>
    <li>{% if page.url != pagination.href.last %}<a href="{{ pagination.href.last }}">{{pagination.pageLinks.length}}</a>{% else %}{{pagination.pageLinks.length}}{% endif %}</li>
  </ol>
</nav>
