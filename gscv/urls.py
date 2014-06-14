from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^api/', include('cards.urls')),
    url(r'^', include('editor.urls')),
)
