from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^$', 'editor.views.index'),
    url(r'^(?P<key>[0-9a-zA-Z]+)$', 'editor.views.index'),
)
