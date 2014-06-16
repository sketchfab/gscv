from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^$', 'editor.views.index'),
    url(r'^(?P<pk>[0-9]+)$', 'editor.views.index'),
    url(r'^(?P<key>[a-zA-Z]+)$', 'editor.views.index'),
)
