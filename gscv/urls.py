from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^api/', include('cards.urls')),
    url(r'^$', include('editor.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
